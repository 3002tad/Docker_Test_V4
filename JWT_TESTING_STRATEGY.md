# JWT Token Strategy cho Parallel Testing

## 🎯 Vấn đề
- GitHub Actions test song song auth và product
- Product test trước đây phụ thuộc vào auth service chạy thực tế
- Tạo dependency không cần thiết và chậm CI/CD

## ✅ Giải pháp
- **Auth test**: Test authentication logic thực tế (register, login, protected routes)
- **Product test**: Generate JWT token trực tiếp, bỏ qua auth service dependency

## 🔧 Implementation

### 1. Test Token Generator
```javascript
// product/src/test/utils/testTokenGenerator.js
function generateTestToken(payload = {}) {
  const defaultPayload = {
    userId: "test-user-id-12345", 
    username: "testuser",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hour
  };
  
  return jwt.sign({...defaultPayload, ...payload}, process.env.JWT_SECRET);
}
```

### 2. Updated Product Test
```javascript
// Before: Call auth service
const authRes = await chai.request("http://localhost:3000").post("/login")...

// After: Generate token directly  
authToken = generateTestToken({
  userId: "test-user-product-123",
  username: process.env.LOGIN_TEST_USER || "testuser"
});
```

### 3. GitHub Actions Workflow
- **test-auth**: Test auth logic với MongoDB service
- **test-product**: Test product logic với generated token (không cần auth service)

## 📊 Lợi ích

### Performance
- ⚡ **Faster CI/CD**: Không cần khởi động auth service cho product test
- 🚀 **True Parallel**: Auth và product test hoàn toàn độc lập
- 💾 **Resource Efficient**: Ít container và dependencies hơn

### Maintainability  
- 🔒 **Isolated Testing**: Mỗi service test logic riêng biệt
- 🛡️ **Reliability**: Product test không bị ảnh hưởng bởi auth service issues
- 🎯 **Focused**: Auth test focus authentication, product test focus business logic

### Development
- 🏃‍♂️ **Local Testing**: Product test chạy nhanh hơn locally
- 🔄 **Consistent**: Token generation deterministic và reliable
- 🐛 **Debugging**: Dễ trace issues trong từng service riêng biệt

## 🧪 Test Results
```bash
# Product test với token generator
Products
✅ Generated test token locally
  POST / ✔ should create a new product with valid data (501ms)
  GET /  ✔ should get all products  
  GET /:id ✔ should get product by id (if API responds)

3 passing (618ms)
```

## 🎯 Best Practices

### Khi nào dùng Auth Service Test:
- ✅ Test registration/login logic
- ✅ Test JWT generation/validation
- ✅ Test password hashing
- ✅ Test authentication middleware

### Khi nào dùng Token Generator:
- ✅ Test protected endpoints
- ✅ Test business logic cần auth
- ✅ Test integration với other services
- ✅ Test API responses cho authenticated users

## 🚀 Kết luận
Chiến lược này tối ưu CI/CD pipeline bằng cách:
- Auth test → Test authentication functionality
- Product test → Test business logic với valid token
- True parallel execution → Faster feedback loop
- Independent failure handling → Better debugging experience