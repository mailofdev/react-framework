#!/bin/bash

echo "🚀 Deploying React app to GitHub Pages from master branch..."

# Build the React app
echo "📦 Building React app..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Create docs directory if it doesn't exist
    mkdir -p docs
    
    # Copy built files to docs directory
    echo "📁 Copying files to docs directory..."
    cp -r build/* docs/
    
    # Add docs folder to git
    echo "📝 Adding docs to git..."
    git add docs/
    
    # Commit the changes
    echo "💾 Committing changes..."
    git commit -m "Deploy React app to GitHub Pages via docs folder"
    
    # Push to master branch
    echo "🚀 Pushing to master branch..."
    git push origin master
    
    echo "✅ Deployment completed!"
    echo "🌐 Your app should be live at: https://mailofdev.github.io/react-framework/"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to your GitHub repository settings"
    echo "2. Navigate to Pages section"
    echo "3. Set Source to 'Deploy from a branch'"
    echo "4. Select 'master' branch and '/docs' folder"
    echo "5. Click Save"
    
else
    echo "❌ Build failed! Please check the errors above."
    exit 1
fi 