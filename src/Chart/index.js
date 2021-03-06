// Copyright 2018 Kensho Technologies, LLC.

import * as React from 'react'
import PropTypes from 'prop-types'

import * as CustomPropTypes from '../CustomPropTypes'
import {THEME} from '../defaults'
import safeInvoke from '../utils/safeInvoke'
import chartTransformFlow from '../chartCore/chartTransformFlow'
import getLayers from '../chartCore/getLayers'
import getLocalKeys from '../chartCore/getLocalKeys'
import CanvasInput from '../CanvasInput'
import {
  getMemoizeDimArrays,
  getMemoizeDomains,
  getMemoizePlotRect,
  getMemoizeRanges,
  getMemoizeRenderLayers,
  getMemoizeScales,
  getMemoizeTickCounts,
  getMemoizeTypes,
} from '../chartCore/memoize'

import withComputedWidth from './withComputedWidth'
import Background from './Background'
import Layers from './Layers'

function getTheme(props) {
  const theme = {...THEME, ...props.theme}
  return {theme}
}

class Chart extends React.Component {
  static propTypes = {
    backgroundShow: PropTypes.bool,
    backgroundOffset: PropTypes.number,
    height: PropTypes.number,
    margin: CustomPropTypes.margin,
    onUpdate: PropTypes.func,
    proportion: PropTypes.number,
    theme: CustomPropTypes.theme,
    width: PropTypes.number.isRequired,
    xShowLabel: PropTypes.bool,
    xShowTicks: PropTypes.bool,
    yShowLabel: PropTypes.bool,
    yShowTicks: PropTypes.bool,
  }

  static defaultProps = {
    backgroundShow: true,
    backgroundOffset: 15,
    margin: {},
    proportion: 0.5,
    xShowLabel: true,
    xShowTicks: true,
    yShowLabel: true,
    yShowTicks: true,
  }

  handleUpdate = childProps => {
    const {onUpdate} = this.props
    safeInvoke(onUpdate, childProps)
  }

  getDimArrays = getMemoizeDimArrays()

  getTypes = getMemoizeTypes()

  getDomains = getMemoizeDomains()

  getPlotRect = getMemoizePlotRect()

  getRanges = getMemoizeRanges()

  getTickCounts = getMemoizeTickCounts()

  getScales = getMemoizeScales()

  getRenderLayers = getMemoizeRenderLayers()

  render() {
    const rootProps = chartTransformFlow(
      this.props,
      getTheme,
      getLayers,
      getLocalKeys,
      this.getDimArrays,
      this.getTypes,
      this.getDomains,
      this.getPlotRect,
      this.getRanges,
      this.getTickCounts,
      this.getScales
    )
    const renderLayers = this.getRenderLayers(rootProps)
    const {height, theme, width} = rootProps
    const style = {
      background: theme.backgroundFill,
      color: theme.textFill,
      fontFamily: theme.fontFamily,
      height,
      position: 'relative',
      userSelect: 'none',
      width,
      willChange: 'transform',
    }
    return (
      <div style={style}>
        <Background {...rootProps} />
        <Layers {...rootProps} renderLayers={renderLayers} />
        <CanvasInput
          onUpdate={this.handleUpdate}
          renderLayers={renderLayers}
          rootProps={rootProps}
          theme={theme}
        />
      </div>
    )
  }
}

export default withComputedWidth(Chart)
