export default JSON.stringify({
  members: ['Jānis', 'Pēteris', 'Liene'],
  items: [
    {
      id: '1231',
      about: 'Jāizveido DSL likumi ar REGEXIEM',
      isConflicting: false,
      isTech: false,
      items: undefined,
      progress: 0.5,
      responsible: 'Jānis',
      assigned: ['Jānis', 'Liene']
    },
    {
      id: '1232',
      about: 'Jāizveido DSL ģenerators',
      isConflicting: false,
      isTech: false,
      progress: 0,
      responsible: 'Pēteris',
      assigned: ['Jānis', 'Liene'],
      items: [
        {
          id: '1233',
          about: 'Jāizveido DSL atpakaļ ģenerātors',
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
