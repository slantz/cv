import React, { Component, PropTypes } from 'react'
import { Grid, Col, Row } from 'react-flexbox-grid/lib/index'
import * as CORE_CONSTANTS from '../constants/Core'

function setRowWidth(row) {
    if ( row.link ) {
        if (!row.time) {
            return 4;
        }
        return 2;
    } else {
        if (!row.time) {
            return 12;
        }
        return 8;
    }
}

function orderSections(info) {
    var sections = [];

    for (var i in info.data) {
        if (info.data.hasOwnProperty(i)) {
            sections.push({
                title: i,
                description: info.data[i],
                order: info.meta[i].order || 0
            })
        }
    }

    sections.sort(function(previous, current) {
        return previous.order - current.order;
    });

    return sections;
}

export default class InfoSection extends Component {

  static propTypes = {
    info: PropTypes.object
  }

  render() {
    const { info } = this.props;
    let sections = orderSections(info);

    return (
      <section className="cv-info-sections">
        {!sections.length && <span className="i-loading" />}
        {sections.map(function(item){
          return <Grid tagName="article" fluid={true} key={item.title}>
            <Row middle="xs">
                <Col xs={12} sm={2} className="i-text-uppercase">
                    {item.title}
                </Col>
                <Col xs={12} sm={10}>
                    {item.description.map(function(row, rowIndex){
                        return <Row key={rowIndex} middle="xs" className="cv-info-sections-description">
                            <Col
                                xs={12}
                                sm={setRowWidth(row)}
                                dangerouslySetInnerHTML={{__html: row.descr}}
                                className={item.description.length > 1
                                    ? 'cv-info-sections-description-text'
                                    : CORE_CONSTANTS.STRING_EMPTY} />
                            {row.time &&
                                <Col
                                    xs={12}
                                    sm={4}
                                    className="i-text-right">
                                    {row.time}
                                </Col>
                            }
                            {row.link &&
                                <Col
                                    xs={12}
                                    sm={8}>
                                    <a
                                        className="i-link"
                                        href={row.link.url}
                                        title={row.link.title}>{row.link.value}</a>
                                </Col>
                            }
                        </Row>
                    })}
                </Col>
            </Row>
          </Grid>;
        })}
      </section>
    )
  }
}
