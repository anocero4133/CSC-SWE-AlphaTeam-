package src.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericToStringSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import redis.clients.jedis.Protocol;

import java.net.URI;
import java.net.URISyntaxException;

@Configuration
public class RedisConfiguration {
    @Bean
    RedisTemplate< String, Object > redisTemplate() {
        final RedisTemplate< String, Object > template =  new RedisTemplate< String, Object >();
        template.setConnectionFactory( jedisConnectionFactory() );
        template.setKeySerializer( new StringRedisSerializer() );
        template.setHashValueSerializer( new GenericToStringSerializer< Object >( Object.class ) );
        template.setValueSerializer( new GenericToStringSerializer< Object >( Object.class ) );
        return template;
    }
    @Bean
    public JedisConnectionFactory jedisConnectionFactory() {
        try {
            String URI = "redis://h:p4cc098acecba40ddf5458f45a011f18bc5667f43773ca747e3573a371bfa7598@ec2-3-82-239-80.compute-1.amazonaws.com:19999";
            URI redisURI = new URI(URI);
            JedisConnectionFactory jedisConnFactory = new JedisConnectionFactory();
            jedisConnFactory.setUsePool(true);
            jedisConnFactory.setHostName(redisURI.getHost());
            jedisConnFactory.setPort(redisURI.getPort());
            jedisConnFactory.setTimeout(Protocol.DEFAULT_TIMEOUT);
            jedisConnFactory.setPassword(redisURI.getUserInfo().split(":", 2)[1]);
            return jedisConnFactory;
        } catch (URISyntaxException e) {
            e.printStackTrace();
            return null;
        }
    }
}
