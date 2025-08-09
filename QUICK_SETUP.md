# Quick Setup Guide - Frontend Already Deployed

Your frontend is already live at: **https://real-time-chatty-application.netlify.app**

## Next Steps:

### 1. Set Environment Variable in Netlify

Go to your Netlify dashboard → Site settings → Environment variables and add:

```
VITE_API_URL=https://your-backend-name.onrender.com/api
```

**Note**: Replace `your-backend-name` with your actual Render backend URL once you deploy it.

### 2. Deploy Backend to Render

1. **Go to [Render Dashboard](https://dashboard.render.com/)**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure:**
   - **Name**: `chat-app-backend` (or your preferred name)
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 3. Set Environment Variables in Render

In your Render service dashboard → Environment tab, add:

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

### 4. Update Netlify Environment Variable

Once your backend is deployed, update the Netlify environment variable with your actual backend URL:

```
VITE_API_URL=https://your-actual-backend-name.onrender.com/api
```

### 5. Test Your Application

1. Visit: https://real-time-chatty-application.netlify.app
2. Test the backend health: `https://your-backend-name.onrender.com/health`
3. Try logging in/registering to test API communication

## Current Status:
- ✅ Frontend deployed to Netlify
- ✅ CORS configured for your Netlify URL
- ⏳ Backend needs to be deployed to Render
- ⏳ Environment variables need to be set

## Troubleshooting:
- If you get CORS errors, make sure your backend URL is correct in the Netlify environment variables
- If the frontend can't connect to the backend, check that the `VITE_API_URL` is set correctly
- Check browser console for any errors
