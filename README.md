## Table of Contents

1.  Checklist
2.  How to Start the Application
3.  Directory Structure
4.  Security Measures
5.

## 1. Checklist

:white_check_mark: Used Next.js with SSR

:white_check_mark: Used TypeScript without using "any"

:white_check_mark: Used Material-UI as much as possible

:white_check_mark: Used Docker node:14-buster-slim image to deploy the app

:white_check_mark: Used React Context

## 2. How to Start the Application

## 3. Directory Structure

I have structured the folders and named the files to keep as much as I can to the Domain-Driven Design philosophy.

#### Pages

To keep the directory structure as easy to follow as possible I have separated the 2 pages (item-list and [editId] which is a dynamic route page) into their respective directories and used css modules.

The API routes for performing CRUD operations can be seen here as well.

```
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
```

#### Components

Layout concerns like the main navigation and the pages layout are addressed in the layout folder, in keeping with convention. Small elements that were reused multiple times were extracted into the `elements` folder and the larger reusable form in its own folder.

```
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
```

#### types

To help with type-checking and debugging, I have a `todoItem.ts` that exports the type which represents the todo item object. This directory is on the same level as the `pages` and `components` directories.

```
📦types
 ┗ 📜todoItem.ts
```

```
import { ObjectId } from "mongodb";

export type todoItem = {
  _id: ObjectId | null;
  content: string;
  dueDate: Date | null;
  status: string;
};
```

#### utils

The snippet for connecting to the database is exported from the `connection.ts` file in the `utils` directory for reusability. This directory just like the one mentioned above is on the same level as the `pages` and `components` directories.

📦utils
┗ 📜connection.ts

## 4. Security Measures

- To prevent Clickjacking and MIME sniffing vulnerabilities, I have include HTTP response headers in `next.config.js` to deny other sources from being able to take advantage of these.

Denying MIME sniffing makes it harder to perform CSRF through malicious file upload.

- The database cluster that this project utilizes is built on AWS infrastructure using MongoDB Atlas.
