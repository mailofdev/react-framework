const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting deployment to master branch...');

try {
  // Build the React app
  console.log('📦 Building React app...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Check if build directory exists
  if (!fs.existsSync('build')) {
    throw new Error('Build directory not found!');
  }
  
  console.log('✅ Build successful!');
  
  // Create a temporary branch for deployment
  console.log('🌿 Creating deployment branch...');
  execSync('git checkout -b temp-deploy', { stdio: 'inherit' });
  
  // Remove all files except build directory
  console.log('🧹 Cleaning repository...');
  const filesToKeep = ['build', '.git', '.github'];
  const currentFiles = fs.readdirSync('.');
  
  currentFiles.forEach(file => {
    if (!filesToKeep.includes(file)) {
      if (fs.lstatSync(file).isDirectory()) {
        execSync(`rm -rf ${file}`, { stdio: 'inherit' });
      } else {
        fs.unlinkSync(file);
      }
    }
  });
  
  // Move build contents to root
  console.log('📁 Moving build files to root...');
  const buildFiles = fs.readdirSync('build');
  buildFiles.forEach(file => {
    fs.renameSync(path.join('build', file), file);
  });
  
  // Remove empty build directory
  fs.rmdirSync('build');
  
  // Add all files
  console.log('📝 Adding files to git...');
  execSync('git add .', { stdio: 'inherit' });
  
  // Commit changes
  console.log('💾 Committing changes...');
  execSync('git commit -m "Deploy React app to GitHub Pages"', { stdio: 'inherit' });
  
  // Force push to master
  console.log('🚀 Force pushing to master...');
  execSync('git push origin temp-deploy:master --force', { stdio: 'inherit' });
  
  // Switch back to master and clean up
  console.log('🔄 Switching back to master...');
  execSync('git checkout master', { stdio: 'inherit' });
  execSync('git branch -D temp-deploy', { stdio: 'inherit' });
  
  console.log('✅ Deployment completed successfully!');
  console.log('🌐 Your app should be live at: https://mailofdev.github.io/react-framework/');
  
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
} 