const hospitalData = [
    {
      id: 'hospital-1',
      name: 'Hospital One',
      children: [
        { id: 'child-1', name: 'Shoulder' },
        { id: 'child-2', name: 'Knee' },
        {
          id: 'child-3',
          name: 'Stomach',
          children: [
            { name: 'Crohns Disease', id: 'Child A1' },
            { name: 'Ulcreative Colotis', id: 'Child A2' }
          ]
        }
      ]
    },
    {
      id: 'hospital-2',
      name: 'Hospital Two',
      children: [
        { name: 'Gamling addiction-4', id: 'Child 4' },
        { name: 'Anxiety', id: 'Child 5' },
        { name: 'Depression', id: 'Child 6' }
      ]
    }
  ];
  
  export default hospitalData;