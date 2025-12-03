const config = {
  development: {
    backendUrl: 'http://localhost:8080/api/v1/dalle',
  },
  production: {
    backendUrl: 'https://threedmodelaitshirtcustomizer-backend.onrender.com/api/v1/dalle',
  },
};

// Auto-detect environment: use production in build, development in dev server
const environment = import.meta.env.MODE === 'production' ? 'production' : 'development';

export default config[environment];
