# Nesting <Route>

Can use either <Route /> or <Route> ... </Route>

### Reasons for using nested <Route>
2. When you want to keep displaying some UI on the page, but also want to display more;
3. When you want to avoid repetition  in your route definitions;

## Why NavLink and not Link
the simple reason is that NavLink has a isActive props for
selecting the activated Link state item.

we can use CSS for it like so:
```css
.active-link{
    font-weight: bold;
    text-decoration: underline;
    color: #161616;
}
```

```javascript
<header>
    <Link className="site-logo" to="/">#VanLife</Link>
    <nav>
        <NavLink
            className={({isActive})=> isActive ? "active-link" : null}
            to="/host">Host</NavLink>
        <NavLink
            className={({isActive})=> isActive ? "active-link" : null}
            to="/about">About</NavLink>
        <NavLink
            className={({isActive})=> isActive ? "active-link" : null}
            to="/vans">Vans</NavLink>
    </nav>
</header>
```
or we can use style props like so:
```javascript
const stylesActive = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616"
}
return (
    <>
        <nav className="host-nav">
            <NavLink
                style={({isActive}) => isActive ? stylesActive : null}
                to="/host"
                end
            >
                Dashboard
            </NavLink>
            <NavLink
                style={({isActive}) => isActive ? stylesActive : null}
                to="/host/income">Income</NavLink>
            <NavLink
                style={({isActive}) => isActive ? stylesActive : null}
                to="/host/reviews">Reviews</NavLink>
        </nav>
        <Outlet />
    </>
);
```

# In the vans page we use the filter function

1. Create filter with the setSearchParams method
```javascript
// ...
const [searchParams, setSearchParams] = useSearchParams();
const typeFilter = searchParams.get("type");
// ...
const displayedVans = typeFilter
    ? vans.filter(van => van.type.toLowerCase() === typeFilter)
    : vans

return (
    <div className="van-list-filter-buttons">
        <button className="van-type simple" onClick={()=>setSearchParams({type: "simple"})}>Simple</button>
        <button className="van-type luxury" onClick={()=>setSearchParams({type: "luxury"})}>Luxury</button>
        <button className="van-type rugged" onClick={()=>setSearchParams({type: "rugged"})}>Rugged</button>
        <button className="van-type clear-filters" onClick={()=>setSearchParams({})}>clear filter</button>
    </div>
)
```
2. the best way to set the filter (it accepts multiple search parameters) with the link method
```javascript
const [searchParams, setSearchParams] = useSearchParams();
const [vans, setVans] = useState([]);
const typeFilter = searchParams.get("type");

function genNewSearchParamString(key, value) {
    const sp = new URLSearchParams(searchParams);
    if(value === null){
        sp.delete(key)
    }else {
        sp.set(key, value)
    }
    return `?${sp.toString()}`
}

return (
    <main>
        <div>
            <Link to={genNewSearchParamString("type", "simple")} >Simple</Link>
            <Link to={genNewSearchParamString("type", "luxury")} >Luxury</Link>
            <Link to={genNewSearchParamString("type", "rugged")} >Rugged</Link>
            <Link to={genNewSearchParamString("type", null)} >clear filter</Link>
        </div>
    </main>
)
```
