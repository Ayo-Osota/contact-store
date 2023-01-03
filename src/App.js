import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'

function App() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("random randomUser");
  const [title, setTitle] = useState("name");
  // const [randomUser, setRandomUser] = useState({})

  const getRandomUser = async() => {
    setLoading(true);
    const response = await fetch(url);
    const users = await response.json();
    // setUsers(users);
    let user = users.results[0];
    const { phone, email } = user
    const { large: image } = user.picture
    const { password } = user.login
    const { first, last } = user.name
    const {
      dob: { age },
    } = user
    const {
      street: { number, name },
    } = user.location

    const randomUser = {
      image,
      phone,
      email,
      password,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`
    }

    setUser(randomUser);
    // setValue(randomUser.name);
    setLoading(false);
  }

  // const getRandomUser = () => {
  //   let randomUser = users[0];
  //   setUsers(randomUser)
  // }

  useEffect(() => {
    getRandomUser();
  }, [])

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label
      setTitle(newValue)
      setValue(user[newValue])
    }
  }

  return (
    <main>
      <div className="block bcg-black"></div>
        <div className="block">
          <div className="container">
            <img src={(user && user.image) || defaultImage} alt="" />
            <p className='user-title'>my {title} is</p>
            <p className='user-value'>{value}</p>
            <div className="values-list">
              <button className="icon"
              data-label="name" onMouseOver={handleValue}
              >
                <FaUser />
              </button>
              <button className="icon"
              data-label="email" onMouseOver={handleValue}
              >
                <FaEnvelopeOpen />
              </button>
              <button className="icon"
              data-label="age" onMouseOver={handleValue}
              >
                <FaCalendarTimes />
              </button>
              <button className="icon"
              data-label="street" onMouseOver={handleValue}
              >
                <FaMap />
              </button>
              <button className="icon"
              data-label="phone" onMouseOver={handleValue}
              >
                <FaPhone />
              </button>
              <button className="icon"
              data-label="password" onMouseOver={handleValue}
              >
                <FaLock />
              </button>
            </div>
            <button className='btn' type='button' onClick={getRandomUser}>
            {loading ? 'loading...' : 'random user'}
          </button>
          </div>
        </div>
    </main>
  )
}

export default App
