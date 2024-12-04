
export default function Loading(){
  let loading;
  function loadings(){
    loading = 'Laoding'
  }
  

  setInterval(() => {
    loadings()
  }, 1000);

  return (
    <div>{loading}</div>
  )
}
