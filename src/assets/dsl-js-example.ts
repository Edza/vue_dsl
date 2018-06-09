export default JSON.stringify({
  members: ['Jānis', 'Pēteris', 'Liene'],
  items: [
    {
      id: '1231',
      about: 'Need to create DSL RULES as regexes.',
      isConflicting: false,
      isTech: false,
      items: undefined,
      progress: 0.5,
      responsible: 'Jānis',
      assigned: ['Jānis', 'Liene']
    },
    {
      id: '1232',
      about: 'Need to create a DSL generator.',
      isConflicting: false,
      isTech: false,
      progress: 0,
      responsible: 'Jānis',
      assigned: ['Jānis', 'Liene'],
      items: [
        {
          id: '1233',
          about: 'Need to create a forward generator.',
          isConflicting: false,
          isTech: true,
          items: undefined,
          progress: 0,
          responsible: 'Jānis',
          assigned: ['Jānis', 'Liene']
        },
      ]
    },
  ],
}, null, 2)
