module.exports = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: process.env.AWS_REGION || 'ap-southeast-1',
    bucket: 'identity-card-customer'
}