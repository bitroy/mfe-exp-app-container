# Use a lightweight Nginx image
FROM nginx:1.27-alpine

# Copy custom nginx config (optional, for SPA routing)
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy the prebuilt dist folder into nginx html directory
COPY dist/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
