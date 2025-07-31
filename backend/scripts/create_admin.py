#!/usr/bin/env python3
"""
Script para criar usuário administrador no sistema Unipass
"""
import sys
import os
from datetime import datetime

# Adicionar o diretório backend ao path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from database.connection import SessionLocal, engine, Base
from models.user import User
from models.admin import AdminUser, UserRole
from models.gym import Gym
from utils.auth import get_password_hash

# Import all models to ensure tables are created
import models.user
import models.admin
import models.gym
import models.checkin
import models.subscription
import models.gamification
import models.features
import models.audit

def create_admin_user():
    """Cria um usuário administrador padrão"""
    
    # Criar todas as tabelas (uma vez é suficiente pois todos os modelos usam o mesmo Base)
    Base.metadata.create_all(bind=engine)
    
    db: Session = SessionLocal()
    
    try:
        # Verificar se já existe um admin
        existing_admin = db.query(User).filter(User.email == "admin@unipass.com").first()
        if existing_admin:
            print("❌ Usuário administrador já existe!")
            print(f"📧 Email: admin@unipass.com")
            return
        
        # Criar usuário administrador
        admin_user = User(
            name="Administrador do Sistema",
            email="admin@unipass.com",
            phone="(11) 99999-9999",
            password_hash=get_password_hash("admin123"),
            is_active=True,
            created_at=datetime.utcnow()
        )
        
        db.add(admin_user)
        db.commit()
        db.refresh(admin_user)
        
        # Criar role de super admin
        admin_role = UserRole(
            user_id=admin_user.id,
            role="super_admin",
            permissions=["all"],
            created_at=datetime.utcnow()
        )
        
        db.add(admin_role)
        db.commit()
        
        print("✅ Usuário administrador criado com sucesso!")
        print(f"📧 Email: admin@unipass.com")
        print(f"🔐 Senha: admin123")
        print(f"🆔 ID: {admin_user.id}")
        print("⚠️  IMPORTANTE: Altere a senha após o primeiro login!")
        
        # Criar usuário de desenvolvimento adicional
        dev_user = User(
            name="Desenvolvedor Teste",
            email="dev@unipass.com", 
            phone="(11) 88888-8888",
            password_hash=get_password_hash("dev123"),
            is_active=True,
            created_at=datetime.utcnow()
        )
        
        db.add(dev_user)
        db.commit()
        db.refresh(dev_user)
        
        # Criar role de admin para o dev
        dev_role = UserRole(
            user_id=dev_user.id,
            role="admin",
            permissions=["user_management", "gym_management", "reports"],
            created_at=datetime.utcnow()
        )
        
        db.add(dev_role)
        db.commit()
        
        print("\n✅ Usuário desenvolvedor criado com sucesso!")
        print(f"📧 Email: dev@unipass.com")
        print(f"🔐 Senha: dev123")
        print(f"🆔 ID: {dev_user.id}")
        
    except Exception as e:
        print(f"❌ Erro ao criar usuário administrador: {e}")
        db.rollback()
    finally:
        db.close()

def create_sample_gyms():
    """Cria academias de exemplo para testes"""
    
    db: Session = SessionLocal()
    
    try:
        # Verificar se já existem academias
        existing_gyms = db.query(Gym).count()
        if existing_gyms > 0:
            print(f"ℹ️  Já existem {existing_gyms} academias no sistema")
            return
            
        sample_gyms = [
            {
                "name": "Smart Fit Paulista",
                "address": "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
                "phone": "(11) 3000-1000",
                "latitude": -23.5505,
                "longitude": -46.6333,
                "open_hours_weekdays": "06:00-22:00",
                "open_hours_weekends": "08:00-18:00",
                "amenities": "WiFi Grátis,Estacionamento,Chuveiros,Café",
                "description": "Academia moderna com equipamentos de última geração",
                "max_capacity": 150,
                "current_occupancy": 45,
                "is_active": True
            },
            {
                "name": "Bio Ritmo Faria Lima",
                "address": "Av. Faria Lima, 2000 - Itaim Bibi, São Paulo - SP", 
                "phone": "(11) 3000-2000",
                "latitude": -23.5729,
                "longitude": -46.6899,
                "open_hours_weekdays": "05:30-23:00",
                "open_hours_weekends": "07:00-19:00",
                "amenities": "WiFi Grátis,Estacionamento,Chuveiros,Lanchonete,Ar Condicionado",
                "description": "Espaço completo para seu bem-estar e saúde",
                "max_capacity": 200,
                "current_occupancy": 67,
                "is_active": True
            },
            {
                "name": "Academia Central",
                "address": "R. Augusta, 500 - Consolação, São Paulo - SP",
                "phone": "(11) 3000-3000", 
                "latitude": -23.5489,
                "longitude": -46.6388,
                "open_hours_weekdays": "06:00-21:00",
                "open_hours_weekends": "08:00-17:00",
                "amenities": "WiFi Grátis,Chuveiros,Café",
                "description": "Academia tradicional no coração de São Paulo",
                "max_capacity": 100,
                "current_occupancy": 23,
                "is_active": True
            }
        ]
        
        for gym_data in sample_gyms:
            gym = Gym(**gym_data)
            db.add(gym)
            
        db.commit()
        print(f"✅ {len(sample_gyms)} academias de exemplo criadas!")
        
    except Exception as e:
        print(f"❌ Erro ao criar academias de exemplo: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    print("🚀 Inicializando banco de dados Unipass...")
    print("=" * 50)
    create_admin_user()
    print("\n" + "=" * 50)
    create_sample_gyms()
    print("\n🎉 Inicialização concluída!")
    print("\n📋 Credenciais de acesso:")
    print("👤 Admin: admin@unipass.com / admin123")
    print("👤 Dev: dev@unipass.com / dev123")
