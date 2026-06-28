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
