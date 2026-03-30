import React, { useState } from 'react';
import { STRESS_THRESHOLDS } from '../utils/constants';

const getStressColor = (score) => {
  if (score <= STRESS_THRESHOLDS.LOW.max) return STRESS_THRESHOLDS.LOW.color;
  if (score <= STRESS_THRESHOLDS.MEDIUM.max) return STRESS_THRESHOLDS.MEDIUM.color;
  if (score <= STRESS_THRESHOLDS.HIGH.max) return STRESS_THRESHOLDS.HIGH.color;
  return STRESS_THRESHOLDS.CRITICAL.color;
};

const getStressLabel = (score) => {
  if (score <= STRESS_THRESHOLDS.LOW.max) return 'Low Stress';
  if (score <= STRESS_THRESHOLDS.MEDIUM.max) return 'Medium Stress';
  if (score <= STRESS_THRESHOLDS.HIGH.max) return 'High Stress';
  return 'Critical Stress';
};

const StressChart = ({ data, type = 'bar' }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  if (!data || data.length === 0) {
    return (
      <div className="chart-container chart-empty-wrapper">
        <p className="chart-empty">⚠️ No stress data available.<br />Generate a timetable first.</p>
      </div>
    );
  }

  // Find max value manually, ensure it's at least 100 for height scaling baseline
  const maxScore = Math.max(100, ...data.map(d => d.value));

  return (
    <div style={styles.container}>
      <div style={styles.chartWrapper}>
        <div style={styles.gridContainer}>
          {/* Y Axis Guides */}
          {[100, 75, 50, 25, 0].map(y => (
            <div key={y} style={{ ...styles.gridLineContainer, bottom: `${y}%` }}>
              <div style={styles.yAxisTick}>{y}</div>
              <div style={styles.gridLine} />
            </div>
          ))}

          {/* Render Warning / Critical Indicator Lines */}
          <div style={{...styles.dangerLine, bottom: '85%'}}>
            <span style={styles.dangerLabel}>85</span>
          </div>
          <div style={{...styles.mediumLine, bottom: '60%'}}>
            <span style={styles.mediumLabel}>60</span>
          </div>

          {/* X Axis & Bars */}
          <div style={styles.barsArea}>
            {/* BACKGROUND SVG FOR LINE GRAPH (ONLY IN LINE MODE) */}
            {type === 'line' && (
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: 'calc(100% - 36px)', zIndex: 1, pointerEvents: 'none' }}>
                {data.map((entry, i) => {
                  if (i === data.length - 1) return null;
                  const next = data[i + 1];
                  const x1 = `${(i + 0.5) * (100 / data.length)}%`;
                  const y1 = `${100 - (entry.value / maxScore) * 100}%`;
                  const x2 = `${(i + 1.5) * (100 / data.length)}%`;
                  const y2 = `${100 - (next.value / maxScore) * 100}%`;
                  return <line key={`line-${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--primary-color)" strokeWidth="3" />;
                })}
              </svg>
            )}

            {/* BARS OR DOTS */}
            {data.map((entry, index) => {
              const heightPercent = (entry.value / maxScore) * 100;
              const color = getStressColor(entry.value);
              
              return (
                <div 
                  key={index} 
                  style={{...styles.barGroup, zIndex: 2}}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div style={styles.barTrack}>
                    {type === 'bar' ? (
                      <div 
                        style={{
                          ...styles.barFill, 
                          height: `${heightPercent}%`, 
                          backgroundColor: color 
                        }}
                      />
                    ) : (
                      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                         <div 
                           style={{
                             position: 'absolute',
                             bottom: `calc(${heightPercent}% - 6px)`,
                             width: '12px',
                             height: '12px',
                             borderRadius: '50%',
                             backgroundColor: color,
                             border: '2px solid #0d1117',
                             zIndex: 4,
                             boxShadow: '0 0 0 2px rgba(163,230,53,0.3)'
                           }}
                         />
                      </div>
                    )}
                    
                    {/* CUSTOM HOVER TOOLTIP */}
                    {hoveredIndex === index && (
                      <div style={{
                        ...styles.hoverTooltip,
                        bottom: `calc(${heightPercent}% + ${type === 'bar' ? '5px' : '15px'})`
                      }}>
                        <div style={styles.hoverTooltipDay}>{entry.name.toUpperCase()}</div>
                        <div style={{...styles.hoverTooltipScore, color}}>
                          {entry.value}<span style={styles.hoverTooltipMax}>/100</span>
                        </div>
                        <div style={{...styles.hoverTooltipLevel, color}}>
                          {getStressLabel(entry.value)}
                        </div>
                      </div>
                    )}

                    {/* Standard Inline Values (Faded slightly if hovering another bar) */}
                    <span style={{
                        position: 'absolute',
                        bottom: type === 'bar' 
                            ? `calc(${heightPercent}% - 22px)`
                            : `calc(${heightPercent}% - 24px)`,
                        color: type === 'bar' ? '#0d1117' : 'var(--text-primary)',
                        fontSize: '11px',
                        fontWeight: 'bold',
                        zIndex: 4,
                        pointerEvents: 'none',
                        opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.3 : 1,
                        transition: 'opacity 0.2s'
                      }}>
                      {entry.value}
                    </span>
                  </div>
                  <div style={styles.xAxisTick}>{entry.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    height: '100%',
    minHeight: '320px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px 20px 20px 40px', // Extra left padding for Y axis
    boxSizing: 'border-box'
  },
  chartWrapper: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    minHeight: '250px'
  },
  gridContainer: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderLeft: '1px solid rgba(163,230,53,0.3)',
    borderBottom: '1px solid rgba(163,230,53,0.3)'
  },
  gridLineContainer: {
    position: 'absolute',
    left: '-35px',
    right: 0,
    display: 'flex',
    alignItems: 'center'
  },
  yAxisTick: {
    width: '25px',
    fontSize: '11px',
    color: 'var(--text-secondary)',
    textAlign: 'right',
    paddingRight: '10px'
  },
  gridLine: {
    flex: 1,
    height: '1px',
    backgroundColor: 'rgba(163,230,53,0.1)',
    borderTop: '1px dashed rgba(163,230,53,0.2)'
  },
  dangerLine: {
    position: 'absolute', left: 0, right: 0, height: '1px', 
    borderTop: '1px dashed #ef4444', zIndex: 1, opacity: 0.6
  },
  mediumLine: {
    position: 'absolute', left: 0, right: 0, height: '1px', 
    borderTop: '1px dashed #f59e0b', zIndex: 1, opacity: 0.6
  },
  dangerLabel: {
    position: 'absolute', right: '5px', top: '-15px', color: '#ef4444', fontSize: '10px'
  },
  mediumLabel: {
    position: 'absolute', right: '5px', top: '-15px', color: '#f59e0b', fontSize: '10px'
  },
  barsArea: {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    paddingBottom: '2px', // space above bottom border
    zIndex: 2,
  },
  barGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    width: '10%',
    minWidth: '35px',
    maxWidth: '60px'
  },
  barTrack: {
    flex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    position: 'relative'
  },
  barFill: {
    width: '85%',
    transition: 'height 0.8s ease-in-out, background-color 0.4s ease',
    borderTopLeftRadius: '6px',
    borderTopRightRadius: '6px',
    display: 'flex',
    justifyContent: 'center',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
  },
  xAxisTick: {
    height: '24px',
    marginTop: '10px',
    fontSize: '12px',
    color: 'var(--text-secondary)',
    textAlign: 'center'
  },
  hoverTooltip: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'var(--bg-secondary)', // #1e293b dark slate
    padding: '10px 14px',
    borderRadius: '8px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
    border: '1px solid rgba(255,255,255,0.08)',
    zIndex: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    minWidth: '95px',
    pointerEvents: 'none',
    boxSizing: 'border-box',
    animation: 'tooltipFade 0.2s ease-out forwards'
  },
  hoverTooltipDay: {
    fontSize: '11px',
    fontWeight: '700',
    color: 'var(--text-secondary)',
    marginBottom: '6px',
    letterSpacing: '0.8px'
  },
  hoverTooltipScore: {
    fontSize: '24px',
    fontWeight: '800',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    lineHeight: '1',
    display: 'flex',
    alignItems: 'baseline'
  },
  hoverTooltipMax: {
    fontSize: '14px',
    opacity: 0.6,
    marginLeft: '2px',
    fontWeight: '600'
  },
  hoverTooltipLevel: {
    fontSize: '12px',
    fontWeight: '600',
    marginTop: '6px'
  }
};

export default StressChart;
