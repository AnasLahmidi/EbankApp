# eBank Frontend

Application bancaire moderne construite avec React, TailwindCSS et React Router.

## 🚀 Installation

```bash
# Cloner le projet
git clone <votre-repo>
cd ebank-frontend

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos paramètres

# Lancer en développement
npm start
```

## 📦 Technologies

- **React 18** - Framework frontend
- **React Router** - Navigation
- **TailwindCSS** - Styling
- **Lucide React** - Icônes
- **JWT** - Authentification

## 🏗️ Structure du projet

```
src/
├── api/              # Services API
├── components/       # Composants réutilisables
│   ├── common/      # Composants UI génériques
│   ├── layout/      # Layout et navigation
│   └── notifications/ # Système de notifications
├── contexts/        # Contextes React
├── hooks/           # Custom hooks
├── pages/           # Pages de l'application
│   ├── auth/       # Authentification
│   ├── client/     # Pages client
│   └── admin/      # Pages admin
├── utils/           # Fonctions utilitaires
├── App.jsx         # Composant principal
└── index.jsx       # Point d'entrée
```

## 🎯 Fonctionnalités

### Client
- ✅ Tableau de bord avec statistiques
- ✅ Consultation des comptes
- ✅ Dépôt d'argent
- ✅ Virement entre comptes
- ✅ Historique des opérations

### Admin/Agent
- ✅ Dashboard administratif
- ✅ Gestion des clients (CRUD)
- ✅ Gestion des comptes
- ✅ Suivi des opérations

## 🔐 Sécurité

- Authentification JWT
- Routes protégées par rôle
- Validation côté client
- Messages d'erreur clairs

## 📱 Responsive

L'application est entièrement responsive et fonctionne sur :
- 📱 Mobile
- 📱 Tablette
- 💻 Desktop

## 🛠️ Scripts disponibles

```bash
npm start       # Démarrer en mode développement
npm build       # Build pour production
npm test        # Lancer les tests
npm run eject   # Ejecter la configuration
```

## 🌐 Variables d'environnement

```env
REACT_APP_API_URL=http://localhost:8080/api
REACT_APP_NAME=eBank
```

## 📝 License

MIT
