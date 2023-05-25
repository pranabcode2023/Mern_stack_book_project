import React, { useEffect, useState } from 'react';
import Profile from '../components/Profile/profiledelete';

const URL = `${process.env.REACT_APP_BASE_URL}authors/all`;

interface ProfileData {
  _id: string;
  email: string;
  username: string;
  books: string;
  image: File | string;
}

const fetchHandler = async () => {
  try {
    const response = await fetch(URL);
    if (response.ok) {
      const data = await response.json();
      return { profiles: data }; // Wrap the data in an object with the 'profiles' key
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Profiles: React.FC = () => {
  const [profiles, setProfiles] = useState<ProfileData[]>([]);

  useEffect(() => {
    fetchHandler().then((data: { profiles: ProfileData[] } | null) => {
      if (data && data.profiles) {
        setProfiles(data.profiles);
      }
    });
  }, []);

  console.log(profiles);

  return (
    <div className='books-container'>
      {profiles.map((profile: ProfileData, i: number) => (
        <div className='book' key={i}>
          <Profile profile={profile} />
        </div>
      ))}
    </div>
  );
};

export default Profiles;
