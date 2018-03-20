var React = require('react');
var render = require('react-dom').render;
var Router = require('react-router-dom').BrowserRouter,
  Link = require('react-router-dom').Link,
  Route = require('react-router-dom').Route;

var cities = [
  {
    name: 'Barcelona',
    id: 'barcelona',
    description: 'The most beautiful city in Spain',
    attractions: [
      {
        name: 'Sagrada Familia',
        tourPrice: '300$',
        address: 'Corts Catalanes'
      },
      {
        name: 'Camp Nou',
        tourPrice: '200$',
        address: 'La Rambla'
      }
    ]
  },
  {
    name: 'Paris',
    id: 'paris',
    description: 'The most beautiful city in France',
    attractions: [
      {
        name: 'Tour Eifel',
        tourPrice: '300$',
        address: 'Champs Elysee'
      },
      {
        name: 'Le Louvre',
        tourPrice: '400$',
        address: 'La rue 9'
      }
    ]
  },
  {
    name: 'Tokyo',
    id: 'tokyo',
    description: 'The most beautiful city in Japan',
    attractions: [
      {
        name: 'Mt Fuji',
        tourPrice: '300$',
        address: 'Marunochi Naka st'
      },
      {
        name: 'National Museum of Modern Arts',
        tourPrice: '100$',
        address: 'Pakuo st'
      }
    ]
  }
];

function Home() {
  return <h1>Welcome!</h1>;
}

function About() {
  return <h1>About page</h1>;
}

function Address(props) {
  var res = cities
    .find(function(city) {
      return city.id === props.match.params.cityId;
    })
    .attractions.find(function(item) {
      return item.name === props.match.params.itemId;
    });
  return (
    <div>
      <h3>{res.name}</h3>
      <p>Tour price: {res.tourPrice}</p>
      <p>Address: {res.address}</p>
    </div>
  );
}

function City({ match }) {
  var city = cities.find(function(item) {
    return item.id === match.params.cityId;
  });
  return (
    <div>
      <h2>{city.name}</h2>
      <p>{city.description}</p>
      <ul>
        {city.attractions.map(function(item) {
          return (
            <li key={item.name}>
              <Link to={`${match.url}/${match.params.cityId}/${item.name}`}>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <hr />
      <Route path={`${match.path}/:cityId/:itemId`} component={Address} />
    </div>
  );
}

function Cities(props) {
  return (
    <div>
      <h1>Cities List</h1>
      <ul>
        {cities.map(function(city) {
          return (
            <li key={city.id}>
              <Link key={city.id} to={`${props.match.url}/${city.id}`}>
                {city.name}
              </Link>
            </li>
          );
        })}
      </ul>
      <hr />
      <Route path={`${props.match.path}/:cityId`} component={City} />
    </div>
  );
}

function App(props) {
  return (
    <Router>
      <div style={{ fontFamily: 'system-ui, sans-serif' }}>
        <ul>
          <li>
            <Link to="/">home</Link>
          </li>
          <li>
            <Link to="/about">about</Link>
          </li>
          <li>
            <Link to="/cities">cities</Link>
          </li>
        </ul>
        <hr />
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/cities" component={Cities} />
      </div>
    </Router>
  );
}

render(React.createElement(App, null, null), document.getElementById('root'));
