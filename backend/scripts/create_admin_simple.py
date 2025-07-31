#!/usr/bin/env python3
"""
Script simplificado para criar usuário administrador no sistema Unipass
"""
import sys
import os
from datetime import datetime, timezone

# Adicionar o diretório backend ao path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def create_admin():
    """Cria usuário administrador e dados básicos"""
    try:
        # Imports
        from sqlalchemy.orm import Session
        from database.connection import SessionLocal, engine, Base
        from models.user import User
        from models.admin import AdminUser, UserRole
        from models.gym import Gym
        from utils.auth import get_password_hash
        
        print("🚀 Inicializando sistema Unipass...")
        print("=" * 50)
        
        # Criar tabelas
        print("📋 Criando estrutura do banco de dados...")
        Base.metadata.create_all(bind=engine)
        print("   ✅ Tabelas criadas com sucesso!")
        
        # Conectar ao banco
        db: Session = SessionLocal()
        
        try:
            # Verificar se admin já existe
            existing_admin = db.query(User).filter(User.email == "admin@unipass.com").first()
            if existing_admin:
                print("ℹ️  Usuário administrador já existe!")
                print(f"📧 Email: admin@unipass.com")
                return
            
            # Criar usuário admin
            print("👤 Criando usuário administrador...")
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
            admin_role = AdminUser(
                user_id=admin_user.id,
                role=UserRole.SUPER_ADMIN,
                permissions='["all"]',  # JSON string
                is_active=True
            )
            
            db.add(admin_role)
            db.commit()
            
            print("✅ Administrador criado com sucesso!")
            print(f"📧 Email: admin@unipass.com")
            print(f"🔐 Senha: admin123")
            print(f"🆔 ID: {admin_user.id}")
            
            # Criar usuário dev
            print("\n👤 Criando usuário desenvolvedor...")
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
            
            print("✅ Desenvolvedor criado com sucesso!")
            print(f"📧 Email: dev@unipass.com")
            print(f"🔐 Senha: dev123")
            
            # Criar academias de exemplo
            print("\n🏢 Criando academias de exemplo...")
            existing_gyms = db.query(Gym).count()
            if existing_gyms == 0:
                sample_gyms = [
                    Gym(
                        name="Smart Fit Paulista",
                        address="Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
                        phone="(11) 3000-1000",
                        latitude=-23.5505,
                        longitude=-46.6333,
                        open_hours_weekdays="06:00-22:00",
                        open_hours_weekends="08:00-18:00",
                        amenities="WiFi Grátis,Estacionamento,Chuveiros,Café",
                        description="Academia moderna com equipamentos de última geração",
                        max_capacity=150,
                        current_occupancy=45,
                        is_active=True
                    ),
                    Gym(
                        name="Bio Ritmo Faria Lima", 
                        address="Av. Faria Lima, 2000 - Itaim Bibi, São Paulo - SP",
                        phone="(11) 3000-2000",
                        latitude=-23.5729,
                        longitude=-46.6899,
                        open_hours_weekdays="05:30-23:00",
                        open_hours_weekends="07:00-19:00",
                        amenities="WiFi Grátis,Estacionamento,Chuveiros,Lanchonete,Ar Condicionado",
                        description="Espaço completo para seu bem-estar e saúde",
                        max_capacity=200,
                        current_occupancy=67,
                        is_active=True
                    ),
                    Gym(
                        name="Academia Central",
                        address="R. Augusta, 500 - Consolação, São Paulo - SP",
                        phone="(11) 3000-3000",
                        latitude=-23.5489,
                        longitude=-46.6388,
                        open_hours_weekdays="06:00-21:00",
                        open_hours_weekends="08:00-17:00",
                        amenities="WiFi Grátis,Chuveiros,Café",
                        description="Academia tradicional no coração de São Paulo",
                        max_capacity=100,
                        current_occupancy=23,
                        is_active=True
                    )
                ]
                
                for gym in sample_gyms:
                    db.add(gym)
                
                db.commit()
                print(f"✅ {len(sample_gyms)} academias criadas!")
            else:
                print(f"ℹ️  Já existem {existing_gyms} academias no sistema")
            
            print("\n" + "=" * 50)
            print("🎉 Inicialização concluída com sucesso!")
            print("\n📋 Credenciais de acesso:")
            print("👤 Admin: admin@unipass.com / admin123")
            print("👤 Dev: dev@unipass.com / dev123")
            print("\n🌐 URLs importantes:")
            print("📱 Frontend: http://localhost:3000")
            print("🔧 Admin Panel: http://localhost:3000/admin")
            print("📋 API Docs: http://localhost:8000/docs")
            
        except Exception as e:
            print(f"❌ Erro durante inicialização: {e}")
            db.rollback()
            raise
        finally:
            db.close()
            
    except Exception as e:
        print(f"❌ Erro crítico: {e}")
        import traceback
        traceback.print_exc()
        return False
    
    return True

if __name__ == "__main__":
    success = create_admin()
    if success:
        print("\n✅ Script executado com sucesso!")
        print("Agora você pode iniciar o backend: python main.py")
    else:
        print("\n❌ Script falhou. Verifique os erros acima.")
        sys.exit(1)
