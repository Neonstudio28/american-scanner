# Secure-context behavior

Camera access depends on browser security rules. Production deployments should use HTTPS, while localhost development is supported by modern browsers. Test the deployed origin explicitly rather than assuming a development environment matches production permissions.