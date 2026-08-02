from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
import resend
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create the router with the /api prefix
api_router = APIRouter(prefix="/api")

resend.api_key = os.environ.get('RESEND_API_KEY')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL')
NOTIFY_EMAIL = os.environ.get('NOTIFY_EMAIL')


def build_reply_email(message: str) -> str:
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#030408;padding:48px 16px;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background-color:#0A1128;border:1px solid #D4AF37;border-radius:16px;padding:40px;">
          <tr><td align="center" style="color:#A3A8B7;font-family:Georgia,serif;font-size:11px;letter-spacing:6px;text-transform:uppercase;padding-bottom:24px;">
            a lantern landed in your sky
          </td></tr>
          <tr><td align="center" style="color:#F2E8CF;font-family:Georgia,serif;font-size:30px;font-style:italic;padding-bottom:28px;">
            Pratishtha wrote back
          </td></tr>
          <tr><td style="background-color:#F4EFEA;border-radius:10px;padding:28px;color:#1A1A1A;font-family:Georgia,serif;font-size:18px;font-style:italic;line-height:1.7;">
            &ldquo;{message}&rdquo;
          </td></tr>
          <tr><td align="center" style="color:#D4AF37;font-family:Georgia,serif;font-size:14px;font-style:italic;padding-top:28px;">
            written under the same sky, for Pratishtha &mdash; from Sadan
          </td></tr>
        </table>
      </td></tr>
    </table>
    """


async def send_reply_notification(message: str):
    params = {
        "from": SENDER_EMAIL,
        "to": [NOTIFY_EMAIL],
        "subject": "Pratishtha replied to your apology",
        "html": build_reply_email(message),
    }
    try:
        await asyncio.to_thread(resend.Emails.send, params)
        logger.info("Reply notification email sent")
    except Exception as e:
        logger.error(f"Failed to send reply notification: {str(e)}")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

class ReplyCreate(BaseModel):
    message: str

class Reply(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    sender: str = "Pratishtha"
    message: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    # Convert to dict and serialize datetime to ISO string for MongoDB
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    # Exclude MongoDB's _id field from the query results
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    
    # Convert ISO string timestamps back to datetime objects
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    
    return status_checks

@api_router.post("/replies", response_model=Reply)
async def create_reply(input: ReplyCreate):
    reply = Reply(message=input.message)
    doc = reply.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    await db.replies.insert_one(doc)
    asyncio.create_task(send_reply_notification(reply.message))
    return reply

@api_router.get("/replies", response_model=List[Reply])
async def get_replies():
    replies = await db.replies.find({}, {"_id": 0}).to_list(1000)
    for r in replies:
        if isinstance(r['timestamp'], str):
            r['timestamp'] = datetime.fromisoformat(r['timestamp'])
    return replies

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()