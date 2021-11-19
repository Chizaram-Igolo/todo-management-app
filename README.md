## Table of Contents

1.  Checklist
2.  How to Start the Application
3.  Directory Structure
4.  Security Measures

## 1. Checklist

:white_check_mark: Used Next.js with SSR

:white_check_mark: Used TypeScript without using "any"

:white_check_mark: Used Material-UI as much as possible

:white_check_mark: Used Docker node:14-buster-slim image to deploy the app

:white_check_mark: Used React Context

## 2. How to Start the Application

## 3. Directory Structure

I have structured the folders and named the files to keep as much as I can to the Domain-Driven Design philosophy.

## 4. Security Measures

#### Pages

To keep the directory structure as easy to follow as possible I have separated the 2 pages (item-list and [editId] which is a dynamic route page) into their respective directories and used css modules.

📦pages
┣ 📂api
┃ ┣ 📜add-item.ts
┃ ┣ 📜delete-item.ts
┃ ┗ 📜update-item.ts
┣ 📂item-list
┃ ┣ 📜index.module.css
┃ ┗ 📜index.tsx
┣ 📂[editId]
┃ ┣ 📜editItem.module.css
┃ ┗ 📜index.tsx
┣ 📜index.tsx
┗ 📜_app.tsx

#### Components

Layout concerns like the main navigation and the pages layout are addressed in the layout folder, in keeping with convention. Small elements that were reused multiple times were extracted into the `elements` folder and the larger reusable form in its own folder.

📦components
┣ 📂elements
┃ ┣ 📜FormButton.tsx
┃ ┣ 📜FormDateTimePicker.tsx
┃ ┣ 📜FormTextInput.tsx
┃ ┣ 📜ItemCard.tsx
┃ ┗ 📜ItemCheckbox.tsx
┣ 📂form
┃ ┗ 📜Form.tsx
┗ 📂layout
┃ ┣ 📜Layout.module.css
┃ ┣ 📜Layout.tsx
┃ ┗ 📜MainNav.tsx
