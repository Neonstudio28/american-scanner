# Deployment Notes

The application expects its Vite-built assets plus detector model assets under `/models`. After deployment, verify the app is served over HTTPS so camera APIs are available, static model files return successfully, and the main module loads without console errors.