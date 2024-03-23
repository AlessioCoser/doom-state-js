import { effect, derive, signal, h, H2, Div, P, Button } from 'doom-reactive-state'
import { Signal } from 'doom-reactive-state/reactivity/types'

type MainProps = { counter: Signal<number> }
const Main = ({ counter }: MainProps) => {
  // this is a non-reactive component it's out of the renderer loop since it isn't wrapped with the `effect` function
  // here we can instantiate the state (!! never instantiate a state in an `effect` function !!)
  const [count, setCount] = counter
  const [btnText, setBtnText] = signal('initial text')
  const [isLoading, setIsLoading] = signal(false)
  // we can use a derived signal and maintain the state in sync
  const doubledText = derive<string>('', () => `doubled is: ${count() * 2}`)
  // we can also edit or update the derived signal (like adding an element to an array)
  const history = derive<number[]>([], (h) => [count(), ...h])

  // we can use setTimeout and setInterval outside re-rendered components
  setTimeout(() => setBtnText('updated text'), 2000)
  setTimeout(() => setCount(count() + 1), 5000)

  effect(() => console.log('count effect', count()))
  effect(() => console.log('loading effect', isLoading()))
  effect(() => console.log('text effect', btnText()))

  const asyncOperation = async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(null), 1000)
    })
  }

  const onButtonClick = async () => {
    setIsLoading(true)
    await asyncOperation()
    setCount(count() + 1)
    setIsLoading(false)
  }

  return h("div", { children: [
    // only functions inside objects are binded
    // all computed properties must be functions
    H2({ children: [() => `count ${count()}`]}),
    // you can use text accessor as reactive text children
    doubledText,
    P({ children: [
      // you can avoid the element reacting for a specific property: see children property, we pass it directly without any function
      // but since the state accessor is a function you can pass it directly and still react to it's change like isLoading
      Button({ style: { display: 'block' }, disabled: isLoading, onclick: onButtonClick, children: [`button ${btnText()}`] }),
      // children array can also be reactive when wrapped in a function
      Div({ children: () => history().map((it) => h("p", { children: [it.toString()] })) })
    ]})
  ]})
}

const App = () => {
  // you can pass the state through all the components,
  // but will be re-rendered only the components that really access it
  const counter = signal(0)
  return Main({ counter })
}

// no need to use magic stuff to attach components to the dom,
// we always return a DOM Element from our components
document.body.appendChild(App())