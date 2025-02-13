import AddItemSection from './components/AddItemSection'
import MainLayout from './components/MainLayout'
import TodoList from './components/TodoList'

const App = () => {
  return (
    <MainLayout>
      <AddItemSection />
      <TodoList />
    </MainLayout>
  )
}

export default App