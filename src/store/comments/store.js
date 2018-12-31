const state = {
  menuActive: false,
  comments: [
    {
      user: { id: 123, name: 'Charlie Brooker', avatar: '' },
      date: '27 Dec 2018 12:39',
      text: 'Praesent purus purus, convallis et odio eu, fringilla finibus nisl.',
      comments: []
    },
    {
      user: { id: 248, name: 'Lenora Crichlow', avatar: '' },
      date: '27 Dec 2018 13:08',
      text: 'Suspendisse vel nunc urna. Nullam a dapibus mi. Nam tincidunt imperdiet laoreet.',
      comments: []
    },
    {
      user: { id: 123, name: 'Charlie Brooker', avatar: '' },
      date: '27 Dec 2018 13:24',
      text: 'Vestibulum sit amet magna tortor. In at euismod neque. Aliquam aliquam nisi sed nisi interdum lobortis. Duis pretium venenatis tristique. Vestibulum rutrum, lectus ut volutpat rhoncus, nulla nunc porta risus, at laoreet eros metus id metus.',
      comments: []
    }
  ]
}

export default {
  state
}
