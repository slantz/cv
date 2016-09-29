import React, { Component, PropTypes } from 'react'
import { Grid, Col, Row } from 'react-flexbox-grid/lib/index'

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

export default class InfoSection extends Component {

  static propTypes = {
    info: PropTypes.object
  }

  render() {
    const { info } = this.props
    let sections = []

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

    return (
      <section className="container car-list__inner pure-g i-ma">
        {sections.map(function(item){
          return <article className="car car--list pure-u-1-3 car--list_padding car--list_flex" key={item.title}>
            <Row style={{'border-bottom' : '1px solid red'}}>
                <Col xs={12} sm={2} style={{'text-transform' : 'uppercase'}}>
                    {item.title}
                </Col>
                <Col xs={12} sm={10}>
                    {item.description.map(function(row, rowIndex){
                        return <Row key={rowIndex} style={{'border-bottom' : '1px solid blue'}}>
                            <Col xs={12} sm={setRowWidth(row)} dangerouslySetInnerHTML={{__html: row.descr}} />
                            {row.time &&
                                <Col xs={12} sm={4} style={{'text-align' : 'right'}}>
                                    {row.time}
                                </Col>
                            }
                            {row.link &&
                                <Col xs={12} sm={8}>
                                    <div>{row.link.value} + {row.link.title} + {row.link.url}</div>
                                </Col>
                            }
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
