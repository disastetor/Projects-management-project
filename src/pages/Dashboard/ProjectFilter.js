
//Filters list
const filterList = [
  "all",
  "mine",
  "developement",
  "design",
  "marketing",
  "sales",
];

export default function ProjectFilter({currentFilter, changeFilter}) {
  
  const handleClick = (newFilter) => {
    console.log(newFilter);
    changeFilter(newFilter);
  };


  return (
    <div className="project-filter">
      <nav>
        <p>Filer By:</p>
        {filterList.map((f) => (
          <button 
          className={currentFilter === f ? 'active' : ''} 
          key={f} 
          onClick={() => handleClick(f)}
          >
            {f}
          </button>
        ))}
      </nav>
    </div>
  );
}
