# Semester_4_Web_Programmierung
Dies ist die angefragte README Datei.
Folgende Module müssen installiert werden:

npm sollte in den folgenden Verzeichnissen vorhanden sein:

\Visual Studio\Web_Programmierung\Semester_4_Web_Programmierung\Projekt_Web_Programmierung\backend
C:\Users\p4tr1\Visual Studio\Web_Programmierung\Semester_4_Web_Programmierung\Projekt_Web_Programmierung\frontend\app

Im Backend Verzeichnis sollte package.json über folgendes Skript verfügen:
"scripts": {
    "start": "node ./server/server.js"
  },
Im Frontend/app Verzeichnis sollte package.json über folgende Skripte verfügen:
"scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },

Möglicherweise muss auch die Version vone Node JS überprüft werden

Befehle zur Installation bzw. Initiation:

cd c:\Users\p4tr1\Visual Studio\Web_Programmierung\Semester_4_Web_Programmierung\Projekt_Web_Programmierung\backend
npm init -y
npm install @fastify/cors @fastify/multipart better-sqlite3 fastify fastify-multipart fastify-plugin uuid
npm start

cd c:\Users\p4tr1\Visual Studio\Web_Programmierung\Semester_4_Web_Programmierung\Projekt_Web_Programmierung\frontend\app
npm init -y

npm install react react-dom next
npm install --save-dev typescript @types/node @types/react @types/react-dom eslint eslint-config-next @eslint/eslintrc
npm run dev