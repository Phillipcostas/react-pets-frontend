import { useState, useEffect } from 'react';
import * as petService from './services/petService';
import PetList from './components/PetList'
import PetDetail from './components/PetDetail'


const App = () => {
  const [petList, setPetList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);


  useEffect(() => {
    const fetchPets = async () => {
      try {
        const pets = await petService.index();
        if (pets.error) {
          throw new Error(pets.error);
        }
  
        setPetList(pets);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPets();
  }, []);

  const handleAddPet = async (formData) => {
    try {
      const newPet = await petService.create(formData);
      if (newPet.error) {
        throw new Error(newPet.error);
      }
      setPetList([newPet, ...petList]);
      setIsFormOpen(false);
    } catch (error) {
      console.log(error)
    }
  };


  const updateSelected = (pet) => {
    setSelected(pet)
  }

  const handleFormView = () => {
    if (!pet.name) setSelected(null);
    setIsFormOpen(!isFormOpen);
  }
  return (
    <>
      <PetList
        petList={petList}
        updateSelected={updateSelected}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {
      isFormOpen ? (
      <PetForm handleAddPet={handleAddPet} selected={selected} />
       ) : (
      <PetDetail selected={selected} handleFormView={handleFormView} />
       )
       };
  

    </>
  );


}; 
export default App;
