#!/bin/bash

# Deploy React App to GitHub Pages from Master Branch
echo "🚀 Starting deployment from master branch..."

# Build the React app
echo "📦 Building React app..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Create a temporary directory for the built files
    echo "📁 Preparing files for deployment..."
    
    # Copy built files to a temporary location
    cp -r build/* .
    
    # Add all files to git
    git add .
    
    # Commit the changes
    git commit -m "Deploy React app to GitHub Pages from master branch"
    
    # Push to master branch
    echo "🚀 Pushing to master branch..."
    git push origin master
    
    echo "✅ Deployment completed! Your app should be live at:"
    echo "   https://mailofdev.github.io/react-framework/"
    
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi 