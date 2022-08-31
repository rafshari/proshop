import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'admin user',
    mobile: '09123595539',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    balance:0,
    isAdmin: true,
  },
  {
    name: 'john doe',
    mobile: '09123595539',
    email: 'john@example.com',
    password: bcrypt.hashSync('123456', 10),
    balance:0,
  },
  {
    name: 'jane doe',
    mobile: '09123595539',
    email: 'jane@example.com',
    password: bcrypt.hashSync('123456', 10),
    balance:0,
  },
]

export default users
