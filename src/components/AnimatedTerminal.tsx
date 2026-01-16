import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedTerminal: React.FC = () => {
    const [displayText, setDisplayText] = useState("");
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [isTyping, setIsTyping] = useState(true);
    const [currentSequenceIndex, setCurrentSequenceIndex] = useState(0);

    // Múltiplas sequências de terminal
    const terminalSequences = [
        // Sequência 1: Java + Spring Boot
        [
            "$ java -version",
            'openjdk version "17.0.2" 2022-01-18',
            "$ git status",
            "On branch main",
            "Your branch is up to date with 'origin/main'",
            "$ mvn spring-boot:run",
            "...",
            "[INFO] Started Application in 2.456 seconds (process running for 2.995)",
            "$ curl localhost:8080/api/health",
            '{ "status": "UP", "components": { "db": "UP", "cache": "UP" } }',
        ],
        [
            "$ docker --version",
            "Docker version 24.0.5, build 24.0.5-0ubuntu1~22.04.1",
            "$ docker-compose up -d",
            'Creating network "app_default" with the default driver',
            "Creating app_db_1    ... done",
            "Creating app_redis_1 ... done",
            "Creating app_api_1   ... done",
            "$ docker ps",
            "CONTAINER ID   IMAGE            STATUS         PORTS                  NAMES",
            "3a7b12c98d31   postgres:13      Up 2 minutes   0.0.0.0:5432->5432/tcp app_db_1",
        ],
        [
            "$ java -version",
            'openjdk version "17.0.2" 2022-01-18',
            "$ git pull",
            "Already up to date.",
            "$ docker-compose up -d",
            "[+] Running 2/2",
            "✔ Container postgres-db  Started",
            "✔ Container api-backend  Started",
            "$ mvn clean install",
            "[INFO] BUILD SUCCESS",
            "$ mvn spring-boot:run",
            "[INFO] Started Application in 3.201 seconds (JVM running for 4.110)",
            "$ curl http://localhost:8080/api/users",
            "[",
            '{ "id": 1, "name": "Caio" },',
            '{ "id": 2, "name": "Luiz" }',
            "]",
        ],
        [
            "$ git clone https://github.com/caiovilquer/petcarescheduler.git",
            "Cloning into 'petcarescheduler'...",
            "$ cd petcarescheduler",
            "$ mvn clean test",
            "[INFO] Running dev.vilquer.PetCareSchedulerTests",
            "[INFO] Tests run: 12, Failures: 0, Errors: 0, Skipped: 0",
            "[INFO] BUILD SUCCESS",
            "$ mvn package",
            "[INFO] Building jar: target/petcarescheduler-1.0.0.jar",
            "$ java -jar target/petcarescheduler-1.0.0.jar",
            "[INFO] Started Application in 2.871 seconds",
        ],
        [
            "$ java -version",
            'openjdk version "21.0.1" 2023-10-17',
            "OpenJDK Runtime Environment Temurin-21.0.1+12 (build 21.0.1+12)",
            "OpenJDK 64-Bit Server VM Temurin-21.0.1+12 (build 21.0.1+12, mixed mode, sharing)",
            "$ echo $JAVA_HOME",
            "/usr/lib/jvm/java-21-openjdk-amd64",
            "$ export SPRING_PROFILES_ACTIVE=prod",
            '$ mvn spring-boot:run -Dspring-boot.run.arguments="--server.port=8081"',
            "[INFO] Started Application in 1.949 seconds",
        ],
    ];

    useEffect(() => {
        // Pegar a sequência atual
        const currentSequence = terminalSequences[currentSequenceIndex];

        if (currentLineIndex >= currentSequence.length) {
            setTimeout(() => {
                // Passar para a próxima sequência
                setCurrentSequenceIndex(
                    (prev) => (prev + 1) % terminalSequences.length
                );
                setCurrentLineIndex(0);
                setDisplayText("");
                setIsTyping(true);
            }, 3000);
            return;
        }

        if (!isTyping) {
            setTimeout(() => {
                setCurrentLineIndex(currentLineIndex + 1);
                setDisplayText(displayText + "\n");
                setIsTyping(true);
            }, 500);
            return;
        }

        const currentLine = currentSequence[currentLineIndex];

        // Verificar se a linha atual não é um comando (não começa com $)
        if (typeof currentLine === "string" && !currentLine.startsWith("$")) {
            setDisplayText(displayText + currentLine);
            setIsTyping(false);
            return;
        }

        if (displayText.split("\n").pop()?.length === currentLine.length) {
            setIsTyping(false);
            return;
        }

        const timer = setTimeout(() => {
            const lines = displayText.split("\n");
            const lastLine = lines.pop() || "";
            const nextCharIndex = lastLine.length;

            if (nextCharIndex < currentLine.length) {
                setDisplayText(
                    [...lines, lastLine + currentLine[nextCharIndex]].join("\n")
                );
            }
        }, Math.random() * 100 + 1);

        return () => clearTimeout(timer);
    }, [
        displayText,
        currentLineIndex,
        isTyping,
        currentSequenceIndex,
        terminalSequences,
    ]);

    return (
        <motion.div
            className="w-full max-w-4xl mx-auto shadow-2xl px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
        >
            <div className="bg-[#1e293b] rounded-t-xl p-3 flex items-center border-b border-[rgba(255,255,255,0.05)]">
                <div className="flex space-x-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="mx-auto text-slate-400 text-[10px] sm:text-xs font-mono opacity-60 truncate max-w-[150px] sm:max-w-none">
                    caio@portfolio:~
                </div>
            </div>
            <div className="bg-[#0f172a]/95 backdrop-blur rounded-b-xl p-4 sm:p-6 h-64 sm:h-96 overflow-x-hidden overflow-y-auto font-mono text-xs sm:text-sm border-x border-b border-[rgba(255,255,255,0.05)] custom-scrollbar">
                <div className="whitespace-pre-wrap text-left leading-relaxed break-words">
                    <span className="text-emerald-400">{displayText}</span>
                    <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-emerald-400 ml-1 align-middle animate-pulse" />
                </div>
            </div>
        </motion.div>
    );
};

export default AnimatedTerminal;
