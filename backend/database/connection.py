import sqlite3
from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# Database configuration
DATABASE_URL = "sqlite:///./unipass.db"
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    """Database dependency for FastAPI"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db():
    """Initialize database and create tables"""
    from models.user import User
    from models.gym import Gym
    from models.checkin import CheckIn
    
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Insert sample data if database is empty
    db = SessionLocal()
    try:
        if db.query(Gym).count() == 0:
            _create_sample_data(db)
    finally:
        db.close()

def _create_sample_data(db):
    """Create sample data for development"""
    from models.gym import Gym
    from models.user import User
    from datetime import datetime
    
    # Sample gyms
    gyms = [
        Gym(
            name="Smart Fit Centro",
            address="Rua das Flores, 123 - Centro, São Paulo - SP",
            phone="(11) 3333-4444",
            latitude=-23.5505,
            longitude=-46.6333,
            open_hours_weekdays="6h às 22h",
            open_hours_weekends="8h às 18h",
            amenities="Wifi Grátis,Estacionamento,Chuveiros,Café",
            description="Academia completa com equipamentos modernos e ambiente climatizado.",
            max_capacity=80,
            current_occupancy=45,
            is_active=True
        ),
        Gym(
            name="Academia Forma",
            address="Av. Paulista, 456 - Bela Vista, São Paulo - SP", 
            phone="(11) 2222-3333",
            latitude=-23.5616,
            longitude=-46.6562,
            open_hours_weekdays="24 horas",
            open_hours_weekends="24 horas",
            amenities="Wifi Grátis,Estacionamento,Chuveiros",
            description="Academia 24 horas com foco em musculação e funcional.",
            max_capacity=60,
            current_occupancy=20,
            is_active=True
        ),
        Gym(
            name="Bio Ritmo",
            address="Rua Augusta, 789 - Consolação, São Paulo - SP",
            phone="(11) 1111-2222", 
            latitude=-23.5584,
            longitude=-46.6623,
            open_hours_weekdays="6h às 20h",
            open_hours_weekends="8h às 16h",
            amenities="Wifi Grátis,Chuveiros,Café,Aulas em Grupo",
            description="Foco em aulas funcionais e bem-estar.",
            max_capacity=50,
            current_occupancy=15,
            is_active=True
        )
    ]
    
    for gym in gyms:
        db.add(gym)
    
    # Sample user
    sample_user = User(
        name="João Silva",
        email="joao.silva@email.com",
        phone="(11) 99999-9999",
        password_hash="$2b$12$dummy_hash_for_development",
        is_active=True
    )
    db.add(sample_user)
    
    db.commit()
