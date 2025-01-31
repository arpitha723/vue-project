const hospitalData = [
    {
      id: 'hospital-1',
      name: 'Hospital One',
      children: [
        { id: 'child-1', name: 'Child 1' },
        { id: 'child-2', name: 'Child 2' },
        {
          id: 'child-3',
          name: 'Child 3',
          children: [
            { id: 'child-a1', name: 'Child A1' },
            { id: 'child-a2', name: 'Child A2' }
          ]
        }
      ]
    },
    {
      id: 'hospital-2',
      name: 'Hospital Two',
      children: [
        { id: 'child-4', name: 'Child 4' },
        { id: 'child-5', name: 'Child 5' }
      ]
    }
  ];
  
  export default hospitalData;