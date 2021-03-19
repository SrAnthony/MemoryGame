import styled, { css } from 'styled-components/native'
import { ThemeType } from 'Utils/Theme'
import { darken } from 'polished'
import TouchableScale from './TouchableScale'

type PaddingsAndMarginsProps = {
  pTop?: number,
  pBottom?: number,
  pLeft?: number,
  pRight?: number,
  
  margins?: [number, number] |
    [number, number, number, number] |
    { left?: number, right?: number, top?: number, bottom?: number },
  paddings?: [number, number] |
    [number, number, number, number] |
    { left?: number, right?: number, top?: number, bottom?: number },
}

const paddingsAndMarginsProps = css<PaddingsAndMarginsProps>`
  ${({ paddings }) => {
    if (!paddings) return

    if (Array.isArray(paddings)) {
      return (
          paddings.length === 4 ? (
              css`padding: ${paddings[0]}px ${paddings[1]}px ${paddings[2]}px ${paddings[3]}px;`
          ) : (
              css`padding: ${paddings[0]}px ${paddings[1]}px;`
          )
      )
    }

    return css`
      padding: ${paddings.top || 0}px ${paddings.right || 0}px ${paddings.bottom || 0}px ${paddings.left || 0}px;
    `
  }}
  ${({ margins }) => {
    if (!margins) return

    if (Array.isArray(margins)) {
      return (
          margins.length === 4 ? (
              css`margin: ${margins[0]}px ${margins[1]}px ${margins[2]}px ${margins[3]}px;`
          ) : (
              css`margin: ${margins[0]}px ${margins[1]}px;`
          )
      )
    }

    return css`
      margin: ${margins.top || 0}px ${margins.right || 0}px ${margins.bottom || 0}px ${margins.left || 0}px;
    `
  }}

  ${p => p.pTop && css`padding-top: ${p.pTop}px`};
  ${p => p.pBottom && css`padding-bottom: ${p.pBottom}px`};
  ${p => p.pLeft && css`padding-left: ${p.pLeft}px`};
  ${p => p.pRight && css`padding-right: ${p.pRight}px`};
`

type RowProps = {
  flexDirection?: string,
  align?: string,
  justify?: string,
  wrap?: boolean,
  isFlex?: boolean,
  column?: boolean,
  backgroundColor?: string,
  
  justifyCenter?: boolean,
  alignCenter?: boolean,
} & PaddingsAndMarginsProps

export const Row = styled.View<RowProps>`
  flex-direction: row;
  ${p => p.alignCenter && css`align-items: center;`}
  ${p => p.justifyCenter && css`justify-content: center;`}

  ${p => p.flexDirection && css`flex-direction: ${p.flexDirection};`}
  ${p => p.column && css`flex-direction: column;`}
  ${p => p.isFlex && css`flex: 1;`}
  ${p => p.align && css`align-items: ${p.align};`}
  ${p => p.justify && css`justify-content: ${p.justify};`}
  ${p => p.wrap && css`flex-wrap: wrap;`}
  ${p => p.backgroundColor && css`background-color: ${p.backgroundColor};`}
  ${paddingsAndMarginsProps}
`

type TextProps = {
  size?: number | 'large' | 'medium' | 'small',
  align?: string,
  alignCenter?: boolean,
  color?: keyof ThemeType['colors'],
  hex?: string,
  isFlex?: boolean,
  fullWidth?: boolean,
  white?: boolean,
  letterSpacing?: number,
  serif?: boolean, // Usa fonte com serifa
} & PaddingsAndMarginsProps

export const Text = styled.Text<TextProps>`
  color: rgba(0, 0, 0, 0.9);
  font-family: ${p => p.theme.font_family};
  text-align: ${p => p.alignCenter ? 'center' : (p.align || 'left')};
  font-size: ${p => {
    switch (p.size) {
      case 'small':
        return 14
      case 'medium':
        return 20
      case 'large':
        return 32
      default:
        return p.size || 14
    }
  }}px;

  ${p => p.isFlex && css`flex: 1`};
  ${p => p.color && css`color: ${darken(.45, p.theme.colors[p.color])}`};
  ${p => p.white && css`color: white`};
  ${p => p.hex && css`color: ${p.hex}`};
  ${p => p.fullWidth && css`width: 100%`};
  ${p => p.letterSpacing && css`letter-spacing: ${p.letterSpacing}px`};

  ${paddingsAndMarginsProps}
`

export const Button = styled(TouchableScale)`
  border-width: 2px;
  border-bottom-width: 6px;
  border-color: ${p => darken(.1, p.theme.colors.primary)};
  padding: 10px 20px;
  width: 100%;
  align-items: center;
  border-radius: 10px;
  background-color: ${p => p.theme.colors.primary};
`
