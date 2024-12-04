
export default function Loading(){
  let loading;
  function loadings(){
    loading = 'Laoding'
  }
  

  setInterval(() => {
    loadings()
  }, 500);

  return (
    <div>{loading}</div>
  )
}
