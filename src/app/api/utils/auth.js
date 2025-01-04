// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// import { query } from '../../utils/db'; 

// const JWT_SECRET = process.env.JWT_SECRET; 
// const SALT_ROUNDS = 10; 

// export default async function handler(req, res) {
//   const { method } = req;

//   try {
//     switch (method) {
      
//       case 'POST': {
//         const { action, email, password, name } = req.body;

//         if (!email || !password || !action) {
//           return res.status(400).json({ message: 'Missing required fields' });
//         }

//         if (action === 'register') {
         
//           const existingUser = (
//             await query('SELECT * FROM users WHERE email = $1', [email])
//           ).rows[0];

//           if (existingUser) {
//             return res.status(409).json({ message: 'Email already in use' });
//           }

          
//           const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

          
//           await query(
//             'INSERT INTO users (email, password, name) VALUES ($1, $2, $3)',
//             [email, hashedPassword, name || null]
//           );

//           return res.status(201).json({ message: 'User registered successfully' });
//         }

//         if (action === 'login') {
         
//           const user = (
//             await query('SELECT * FROM users WHERE email = $1', [email])
//           ).rows[0];

//           if (!user) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//           }

//           const passwordMatch = await bcrypt.compare(password, user.password);

//           if (!passwordMatch) {
//             return res.status(401).json({ message: 'Invalid email or password' });
//           }

          
//           const token = jwt.sign(
//             { userId: user.user_id, email: user.email },
//             JWT_SECRET,
//             { expiresIn: '1h' }
//           );

//           return res.status(200).json({ token, message: 'Login successful' });
//         }

//         return res.status(400).json({ message: 'Invalid action' });
//       }

      
//       case 'GET': {
//         const { token } = req.headers;

//         if (!token) {
//           return res.status(400).json({ message: 'Token is required' });
//         }

//         try {
//           const decoded = jwt.verify(token, JWT_SECRET);
//           return res.status(200).json({ valid: true, data: decoded });
//         } catch (error) {
//           return res.status(401).json({ valid: false, message: 'Invalid token' });
//         }
//       }

//       default:
//         return res.status(405).json({ message: 'Method not allowed' });
//     }
//   } catch (error) {
//     console.error('Error in /api/auth:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// }
