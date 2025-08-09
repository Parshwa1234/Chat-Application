# Deployment Guide for Chat Application

This guide will help you deploy your chat application with the backend on Render and frontend on Netlify.

## Prerequisites

1. **MongoDB Database**: You'll need a MongoDB database (MongoDB Atlas is recommended)
2. **Cloudinary Account**: For file uploads (optional but recommended)
3. **GitHub Repository**: Your code should be in a GitHub repository
4. **Render Account**: For backend deployment
5. **Netlify Account**: For frontend deployment

## Step 1: Backend Deployment on Render

### 1.1 Prepare Your Repository
- Make sure your backend code is in the `backend/` folder
- Ensure all dependencies are listed in `package.json`
- The `render.yaml` file is already configured

### 1.2 Deploy to Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**
2. **Click "New +" and select "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name**: `chat-app-backend` (or your preferred name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 1.3 Set Environment Variables

In your Render service dashboard, go to "Environment" tab and add these variables:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=https://real-time-chatty-application.netlify.app
```

### 1.4 Get Your Backend URL

After deployment, Render will provide you with a URL like:
`https://your-app-name.onrender.com`

## Step 2: Frontend Deployment on Netlify

### 2.1 Prepare Your Repository
- Make sure your frontend code is in the `frontend/` folder
- The `netlify.toml` file is already configured

### 2.2 Deploy to Netlify

1. **Go to [Netlify Dashboard](https://app.netlify.com/)**
2. **Click "Add new site" → "Import an existing project"**
3. **Connect your GitHub repository**
4. **Configure the build settings:**
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### 2.3 Set Environment Variables

In your Netlify site dashboard, go to "Site settings" → "Environment variables" and add:

```
VITE_API_URL=https://your-backend-name.onrender.com/api
```

### 2.4 Get Your Frontend URL

After deployment, Netlify will provide you with a URL like:
`https://real-time-chatty-application.netlify.app` (your actual URL)

## Step 3: Update CORS Configuration

### 3.1 Update Backend CORS

In your `backend/src/index.js`, update the `allowedOrigins` array with your actual Netlify URL:

```javascript
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
     "https://real-time-chatty-application.netlify.app", // Your actual Netlify URL
  "https://your-custom-domain.com" // If you have a custom domain
];
```

### 3.2 Redeploy Backend

After updating the CORS configuration, redeploy your backend on Render.

## Step 4: Test Your Deployment

1. **Test Backend Health**: Visit `https://your-app-name.onrender.com/health`
2. **Test Frontend**: Visit your Netlify URL
3. **Test API Calls**: Make sure your frontend can communicate with the backend

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Make sure your frontend URL is in the allowed origins
2. **Environment Variables**: Double-check all environment variables are set correctly
3. **Build Failures**: Check the build logs in both Render and Netlify
4. **Database Connection**: Ensure your MongoDB URI is correct and accessible

### Debugging:

- **Render Logs**: Check the logs in your Render service dashboard
- **Netlify Logs**: Check the deploy logs in your Netlify dashboard
- **Browser Console**: Check for any frontend errors

## Security Notes

1. **Never commit sensitive data** like API keys or database URIs
2. **Use strong JWT secrets**
3. **Enable HTTPS** (both Render and Netlify provide this by default)
4. **Regularly update dependencies**

## Cost Considerations

- **Render Free Tier**: 750 hours/month, auto-sleeps after 15 minutes of inactivity
- **Netlify Free Tier**: 100GB bandwidth/month, unlimited builds
- **MongoDB Atlas**: Free tier available with 512MB storage

## Next Steps

1. **Custom Domain**: Set up a custom domain for both frontend and backend
2. **SSL Certificates**: Both platforms provide free SSL
3. **Monitoring**: Set up monitoring and logging
4. **CI/CD**: Configure automatic deployments on git push
