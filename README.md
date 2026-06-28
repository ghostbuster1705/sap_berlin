# Cornelsen Talent Portal

Enterprise SAP Fiori application for talent management, inspired by Cornelsen corporate design.

## Features

- **Dashboard** — KPI cards, quick actions, news, upcoming events
- **Employee Worklist** — searchable, filterable list with avatars
- **Object Page** — 360° employee view with avatar, contacts, organization, projects, skills, documents, activities
- **Analytics** — headcount metrics, department distribution, location overview
- **SAP Fiori Shell** — side navigation, global search, responsive layout

## Tech Stack

- OpenUI5 1.120 (SAP Horizon theme)
- SAP Fiori design patterns (Object Page, Worklist, Dashboard)
- JSON mock data models

## Quick Start

```bash
npm install
npm start
```

Open [http://localhost:8080/index.html](http://localhost:8080/index.html)

## Public URL (GitHub Pages)

После включения Pages приложение доступно **откуда угодно**, без запущенного сервера:

**https://ghostbuster1705.github.io/sap_berlin/**

Один раз в репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

Деплой запускается автоматически при push в `main` или `cursor/sap-cornelsen-app-6777`.  
Локально и в BAS по-прежнему используется `npm start` / `npm run start:bas`.

## SAP Business Application Studio (BAS)

```bash
cd projects
git clone https://github.com/ghostbuster1705/sap_berlin.git
cd sap_berlin
git checkout cursor/sap-cornelsen-app-6777
npm install
npm run start:bas
```

Then open the **Preview** link for port 8080 in BAS, or:

```
https://port8080-workspaces-ws-mueya.us10.trial.applicationstudio.cloud.sap/index.html
```

**Important:** The server must be running (`npm run start:bas`) before opening the preview URL.
Use `accept-remote-connections` so BAS port forwarding works.

If the page is blank:
1. Check the terminal — `ui5 serve` must be running without errors
2. Open browser DevTools (F12) → Console for error messages
3. Make sure you are in the project root (where `ui5.yaml` is located)
4. Try `http://localhost:8080/index.html` inside BAS preview first

## Project Structure

```
webapp/
├── Component.js          # UI5 component bootstrap
├── manifest.json         # App descriptor & routing
├── index.html            # Entry point
├── css/style.css         # Cornelsen custom theme
├── controller/           # View controllers
├── view/                 # XML views
├── model/mockdata/       # Employee & dashboard data
└── i18n/                 # German translations
```

## Routes

| Route | Page |
|-------|------|
| `#/` | Home Dashboard |
| `#/worklist` | Employee List |
| `#/employee/{id}` | Employee Object Page |
| `#/analytics` | HR Analytics |
