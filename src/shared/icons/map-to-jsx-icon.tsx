import { FC, PropsWithChildren, SVGAttributes } from 'react';
import styled from 'styled-components';

export interface IJsxIconProps {
  $colorName?: string;
  $highlightOnFocus?: boolean;
  $highlightOnHover?: boolean;
  $cursorPointer?: boolean;
  $width?: 15 | 16 | 18 | 20 | 22 | 24 | 32 | 36 | 48 | (number & {});
  $height?: 15 | 16 | 18 | 20 | 22 | 24 | 32 | 36 | 48 | (number & {});
  $marginLeft?: number;
  $marginRight?: number;
  $marginTop?: number;
  $marginBottom?: number;
}

export type StyledJsxIcon = FC<IJsxIconProps & PropsWithChildren<SVGAttributes<SVGElement>>>;
export function mapToJsxIcon(svgIcon: FC<SVGAttributes<SVGElement>>): StyledJsxIcon {
  return styled(svgIcon)<IJsxIconProps>`
    margin-left: ${({ $marginLeft }) => `${$marginLeft ?? 0}px`};
    margin-right: ${({ $marginRight }) => `${$marginRight ?? 0}px`};
    margin-top: ${({ $marginTop }) => `${$marginTop ?? 0}px`};
    margin-bottom: ${({ $marginBottom }) => `${$marginBottom ?? 0}px`};
    width: ${({ $width }) => `${$width ?? 24}px`};
    height: ${({ $height }) => `${$height ?? 24}px`};
    cursor: ${({ $cursorPointer }) => ($cursorPointer ? 'pointer' : 'default')};
    min-width: ${({ $width }) => `${$width ?? 24}px`};
    min-height: ${({ $height }) => `${$height ?? 24}px`};
  `;
}
