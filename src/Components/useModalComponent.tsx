import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const ComponentModalsContext = createContext<ModalContextType>(
  // @ts-ignore
  [{}, () => {
  }],
)

type ModalContextType = [
  ModalStateType, React.Dispatch<React.SetStateAction<ModalStateType>>
]

type ModalStateType = [
  React.FC<any>,
  any
][]

export type ModalComponent<T> = (props: T & {
  visible: boolean,
  close: () => void,
}) => JSX.Element | null

export const ComponentModalsContextProvider: React.FC = ({ children }) => {
  const [modal_state, setModalState] = useState<ModalStateType>([])
  
  const modals_context_value: ModalContextType = useMemo(() => (
    [modal_state, setModalState]
  ), [modal_state, setModalState])
  
  return (
    <ComponentModalsContext.Provider value={modals_context_value}>
      {children}
      
      {modal_state.map(([Modal, { key, ...props }]) => {
        
        return (
          <Modal key={key} {...props} />
        )
      })}
    </ComponentModalsContext.Provider>
  )
}

const useModalComponent = <T extends React.FC<any>>(ModalComponent: T, pre_options?: Partial<Parameters<T>[0]>) => {
  const [, setModalState] = useContext(ComponentModalsContext)
  
  const closeTimeoutRef = useRef<any>(null)
  const uuidRef = useRef(String(Math.random()))
  
  const close = useCallback(() => {
    setModalState(prev => {
      const new_modals = [...prev]
      const index = new_modals.findIndex(modal => modal[1].key === uuidRef.current)
      if (index < 0) return prev
      
      new_modals[index][1] = {
        ...new_modals[index][1],
        visible: false,
      }
      
      return new_modals
    })
    
    // Mata o modal depois de 1s
    closeTimeoutRef.current = setTimeout(() => {
      setModalState(prev => (
        [...prev].filter(modal => modal[1].key !== uuidRef.current)
      ))
    }, 1000)
  }, [setModalState])
  
  const open = useCallback((options?: Partial<Parameters<T>[0]>) => {
    uuidRef.current = String(Math.random())
    clearTimeout(closeTimeoutRef.current)
    
    setModalState(prev => ([
      ...prev,
      [
        ModalComponent,
        {
          ...(pre_options || {}),
          ...(options || {}),
          close,
          key: uuidRef.current,
          visible: true,
        },
      ],
    ]))
  }, [pre_options, ModalComponent, close, setModalState])
  
  return useMemo(() => (
    [open, close] as const
  ), [open, close])
}

export default useModalComponent
