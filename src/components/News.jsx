import React,{useState} from 'react';

import {Select,Row,Avatar,Card,Typography,Col} from 'antd';
import moment from 'moment';
import { useGetCryptosNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const {Text,Title}=Typography;
const {Option} = Select;

const News = ({simplified}) => {
  
  const [newsCategory,setNewsCategory]=useState('Cryptocurrency')
  const {data:cryptoNews,isFetching} = useGetCryptosNewsQuery({newsCategory,count:simplified?10:100});
  const {data:cryptoApi} = useGetCryptosQuery(100);
  // console.log('news ',cryptoNews)

  const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';


  if(!cryptoNews?.value) return <Loader/> ;

  return (
   <>
    
    <Row gutter={[24,24]}>
    {
      !simplified &&
      <Col span={24}>

      <Select
      showSearch
      className='select-news'
      placeholder='Select a Crypto'
      optionFilterProp='children'
      onChange={(value)=>setNewsCategory(value)}
      filterOption={(input,option)=>option.children.toLowerCase().indexOf(input.toLowerCase())>=0}
      >
        <Option value='Cryptocurrency'>Cryptocurrency</Option>
        {
          cryptoApi.data?.coins?.map((coin)=>(
            <Option value={coin.name}>{coin.name}</Option>
          ))
        }
      </Select>

      </Col>
      }


      {
        cryptoNews.value.map((news,i)=>(
          <Col sm={12} xs={12} lg={8} key={i}>
              <Card
               hoverable
               className='news-card'
              >
               <a href={news.url} target='_blank' rel='noreferrer'>
                 <div className='news-image-container'>
                    <Title className='news-title' level={4}>{news.name}</Title>
                    <img style={{maxWidth:'200px',maxHeight:'100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                 </div>
                 <p>
                  {
                    news.description > 100 ? `${news.description.substring(0,100)}...`:news.description
                  }
                 </p>
                 <div className='provider-container'>
                    <div>
                      <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='' />
                      <Text className='provider-name'>{news.provider[0]?.name}</Text>
                    </div>
                    <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                 </div>
               </a>
              </Card>
          </Col>
        ))
      }
    </Row>
   </>
  )
}

export default News