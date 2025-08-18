package com.example.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.index.IndexOperations;

import com.example.backend.model.User;
import jakarta.annotation.PostConstruct;


@Configuration
public class MongoConfig {

    private final MongoTemplate mongoTemplate;

    public MongoConfig(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @PostConstruct
    public void initIndexes() {
        IndexOperations indexOps = mongoTemplate.indexOps(User.class);
        Index index = new Index().on("email",org.springframework.data.domain.Sort.Direction.ASC).unique();
        indexOps.createIndex(index);
    }

}
