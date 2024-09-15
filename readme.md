# Description
This project showcases a simple implementation of the publish/subscribe (pub/sub) model using Apollo Server Subscriptions in a news-based application. The key feature of the system is the ability for users to subscribe to specific news categories, while an admin acts as the publisher by creating posts in those categories.

## Key Concepts
- **Publisher (Admin)**: The admin creates news posts in specific categories. When a post is created, it acts as a publication to a particular topic (the news category).
- **Subscriber (User)**: Users subscribe to the news categories they are interested in. These subscriptions allow users to receive real-time notifications whenever a new post is made in their chosen categories.
- **Topic (News Category)**: The categories that define the areas of interest for news posts. Both the admin and users are unaware of each other; the interaction occurs only through the category subscriptions.

This implementation uses Apollo Server’s built-in support for GraphQL subscriptions to manage the real-time notifications. The pub/sub model decouples the admin (publisher) and users (subscribers) so that they are independent, allowing dynamic communication based on category subscriptions.

With this system, users can stay updated with the latest news in their chosen categories, while the admin can efficiently distribute content to the relevant audience without any direct linkage between the two parties.

## Technologies Used
- **Node.js**: Backend server framework.
- **Apollo Server**: To handle GraphQL queries and subscriptions.
- **GraphQL Subscriptions**: For managing real-time pub/sub communication.
- **Express**: Web framework to manage API routes and server setup.
- **MongoDB (via Mongoose)**: Database to store users, subscriptions, and posts.
- **bcryptjs**: For password hashing.
- **jsonwebtoken**: For authentication and authorization.

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/MananKansara26/Graphql-Subscription-PubSub
cd Graphql-Subscription-PubSub
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set up environment variables:
Copy the .env.example file and rename it to .env. Then, fill in the required values:
```bash
PORT=server_port
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
```

### 4. Run database migrations
Add admin user via migration
```bash
npx migrate-mongo up
```

### 5. Run the Project
To start the production server :
```bash
npm start
```
To starts the development server using nodemon for live-reload :
```bash
npm run dev
```

### Admin User Credentials
- **Email**: admin@gmail.com
- **Password**: Test@1234

Users can create their accounts using the sign-up option.

### Usage
- **Subscribe to a Category**: Users can subscribe to specific news categories using a GraphQL mutation.
- **Post News**: The admin can create a post for a specific category, which will trigger a notification to subscribed users.
- **Real-Time Notifications**: Subscribers receive notifications in real-time when a post is made to a category they are subscribed to.
