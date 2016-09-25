import React, { Component, PropTypes } from 'react'
import { Col, Row } from 'react-flexbox-grid/lib/index'

export default class InfoSection extends Component {

  static propTypes = {
    info: PropTypes.object
  }

  render() {
    const { info } = this.props
    let sections = []

    for (var i in info) {
      if (info.hasOwnProperty(i)) {
        sections.push({
          title: i,
          description: info[i]
        })
      }
    }

    return (
      <section className="container car-list__inner pure-g i-ma">
        {sections.map(function(item){
          return <article className="car car--list pure-u-1-3 car--list_padding car--list_flex" key={item.title}>
            <Row>
                <Col xs={2}>
                    {item.title}
                </Col>
                <Col xs={10}>
                    {item.description.map(function(row, rowIndex){
                        return <Row middle="xs" key={rowIndex}>
                            <Col xs={2} dangerouslySetInnerHTML={{__html: row.descr}} />
                            <Col xs={2}>
                                {row.time}
                            </Col>
                            <Col xs={8}>
                                {row.link && <div>{row.link.value} + {row.link.title} + {row.link.url}</div>}
                            </Col>
                        </Row>
                    })}
                </Col>
            </Row>
          </article>;
        })}
      </section>
    )
  }
}
