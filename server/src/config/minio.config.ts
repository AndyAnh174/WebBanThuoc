import { registerAs } from '@nestjs/config';

export default registerAs('minio', () => {
  const endpoint = process.env.MINIO_ENDPOINT || 'localhost';
  const port = parseInt(process.env.MINIO_PORT || '9000', 10);
  const useSSL = process.env.MINIO_USE_SSL === 'true';

  return {
    endpoint,
    port,
    useSSL,
    accessKey: process.env.MINIO_ROOT_USER || 'minioadmin',
    secretKey: process.env.MINIO_ROOT_PASSWORD || 'minioadmin123',
    bucket: process.env.AWS_S3_BUCKET || 'webbanthuoc-bucket',
    region: process.env.AWS_REGION || 'us-east-1',

    // Internal URL for MinIO client
    internalUrl: `${useSSL ? 'https' : 'http'}://${endpoint}:${port}`,

    // Public URL for accessing files (có thể khác với internal URL nếu dùng nginx proxy)
    publicUrl: process.env.MINIO_PUBLIC_URL || `http://${endpoint}:${port}`,
  };
});
